import { Prisma, type Flight } from "@prisma/client";
import {
  StatusCodes,
  type ICreateFlightInput,
  type IGetFlightQuery,
} from "../models";
import {
  AirplaneRepository,
  AirportRepository,
  FlightRepository,
} from "../repositories";
import {
  ServiceSuccessResult,
  ServiceValidationErrorResult,
  type ServiceResult,
} from "./service-result";
import { ApiException, FlightError } from "../utils";
import type { FlightDTO } from "../DTOs";

export class FlightService {
  private _flightRepository: FlightRepository;
  private _airplaneRepository: AirplaneRepository;
  private _airportRepository: AirportRepository;

  constructor() {
    this._flightRepository = new FlightRepository();
    this._airplaneRepository = new AirplaneRepository();
    this._airportRepository = new AirportRepository();
  }

  /**
   * @description Create a new flight
   * @param {ICreateFlightInput} input - The flight input data
   * @returns {Promise<ServiceResult<Flight>>} Created flight or validation errors
   */
  public async createFlight(
    input: ICreateFlightInput
  ): Promise<ServiceResult<Flight>> {
    try {
      const airplane = await this._airplaneRepository.get(input.airplaneId);

      if (airplane === null || airplane.id <= 0) {
        return new ServiceValidationErrorResult(StatusCodes.NOT_FOUND, [
          FlightError.ServiceError.AirplaneNotFound,
        ]);
      }

      if (input.departureAirportCode === input.arrivalAirportCode) {
        return new ServiceValidationErrorResult(StatusCodes.BAD_REQUEST, [
          FlightError.ServiceError.SameDepartureAndArrivalAirport,
        ]);
      }

      const departureAirport = await this._airportRepository.getAirportByCode(
        input.departureAirportCode
      );

      if (departureAirport === null || departureAirport.id <= 0) {
        return new ServiceValidationErrorResult(StatusCodes.NOT_FOUND, [
          FlightError.ServiceError.DepartureAirportNotFound,
        ]);
      }

      const arrivalAirport = await this._airportRepository.getAirportByCode(
        input.arrivalAirportCode
      );

      if (arrivalAirport === null || arrivalAirport.id <= 0) {
        return new ServiceValidationErrorResult(StatusCodes.NOT_FOUND, [
          FlightError.ServiceError.ArrivalAirportNotFound,
        ]);
      }

      if (input.totalSeats > airplane.capacity) {
        return new ServiceValidationErrorResult(StatusCodes.BAD_REQUEST, [
          FlightError.ServiceError.TotalSeatsExceedsAirplaneCapacity,
        ]);
      }

      if (
        this.isArrivalAfterDeparture(input.departureTime, input.arrivalTime) ===
        false
      ) {
        return new ServiceValidationErrorResult(StatusCodes.BAD_REQUEST, [
          FlightError.ServiceError.ArrivalTimeBeforeDepartureTime,
        ]);
      }

      const flight = await this._flightRepository.create({
        ...input,
        price: new Prisma.Decimal(input.price),
        boardingGate: input?.boardingGate ?? "N/A",
      });
      return new ServiceSuccessResult<Flight>(StatusCodes.CREATED, flight);
    } catch (err: any) {
      throw new ApiException("Failed to create flight!", err);
    }
  }

  /**
   * @description Get all flights based on queries
   * @param query The flight query
   * @returns {Promise<ServiceResult<Flight[]>>} List of flights or not found
   */
  public async getAllFlights(
    query: IGetFlightQuery
  ): Promise<ServiceResult<FlightDTO[]>> {
    try {
      const customFilters: any = {
        totalSeats: {},
      };
      let sortFilters: any[] = [];

      const trips = query.trips.split("-");
      customFilters.departureAirportCode = trips[0];
      customFilters.arrivalAirportCode = trips[1];
      customFilters.totalSeats.gte = query.travelers;

      if (
        customFilters.arrivalAirportCode === customFilters.departureAirportCode
      ) {
        return new ServiceValidationErrorResult(StatusCodes.BAD_REQUEST, [
          FlightError.ServiceError.SameDepartureAndArrivalAirport,
        ]);
      }

      if (query.price) {
        const [minPrice, maxPrice] = query.price.split("-").map(Number);

        customFilters.price = {
          gte: minPrice,
          lte: maxPrice,
        };
      }

      if (query.depart) {
        const [year, month, day] = query.depart.split("-").map(Number);

        const startDate = new Date(year, month - 1, day, 0, 0, 0);
        const endDate = new Date(year, month - 1, day, 23, 59, 59);

        customFilters.departureTime = {
          gte: startDate,
          lte: endDate,
        };
      }

      if (query.sort) {
        sortFilters = query.sort.split(",").map((item) => {
          const [field, direction] = item.trim().split("_");
          return { [field]: direction === "ASC" ? "asc" : "desc" };
        });
      }

      const flights = await this._flightRepository.getAllFlights(
        customFilters,
        sortFilters
      );
      return new ServiceSuccessResult<FlightDTO[]>(StatusCodes.OK, flights);
    } catch (err: any) {
      console.log(err);
      throw new ApiException("Failed to retrieve flights!", err);
    }
  }

  /**
   * Checks if arrival date/time is after departure date/time
   * @param departureTime The departure date and time
   * @param arrivalTime The arrival date and time
   * @returns Boolean indicating if arrival is after departure
   */
  private isArrivalAfterDeparture(
    departureTime: Date,
    arrivalTime: Date
  ): boolean {
    const arrivalDate = new Date(arrivalTime);
    const departureDate = new Date(departureTime);

    return arrivalDate.getTime() > departureDate.getTime();
  }
}
