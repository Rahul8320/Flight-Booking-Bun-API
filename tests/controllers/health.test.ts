import { describe, it, expect, mock, spyOn } from "bun:test";
import type { Request, Response } from "express";
import { HealthController } from "../../src/controllers";
import { StatusCodes } from "../../src/models/statusCodes";
import { logger } from "../../src/config";

describe("HealthController", () => {
  it("should return a healthy status", () => {
    // Arrange
    const mockRequest = {} as Request;
    const mockResponse = {
      status: mock(() => mockResponse),
      json: mock(() => {}),
    } as unknown as Response;

    const loggerSpy = spyOn(logger, "info");
    const healthController = new HealthController();

    // Act
    healthController.getHealth(mockRequest, mockResponse);

    // Assert
    expect(loggerSpy).toHaveBeenCalledWith("Api is healthy");
    expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.OK);
    expect(mockResponse.json).toHaveBeenCalledWith({
      success: true,
      message: "Api is healthy",
      data: {},
      error: null,
    });

    // Cleanup
    loggerSpy.mockRestore();
  });
});
