import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const airplanes = [
    { modelNumber: "Boeing 747-8", capacity: 467 },
    { modelNumber: "Airbus A380", capacity: 544 },
    { modelNumber: "Boeing 777-300ER", capacity: 365 },
    { modelNumber: "Airbus A350-900", capacity: 325 },
    { modelNumber: "Boeing 787-9", capacity: 290 },
    { modelNumber: "Airbus A320neo", capacity: 180 },
    { modelNumber: "Boeing 737 MAX 8", capacity: 178 },
    { modelNumber: "Embraer E190", capacity: 100 },
    { modelNumber: "Bombardier CRJ900", capacity: 86 },
    { modelNumber: "ATR 72", capacity: 78 },
    { modelNumber: "Boeing 767-300ER", capacity: 219 },
    { modelNumber: "Airbus A330-300", capacity: 299 },
    { modelNumber: "Boeing 757-200", capacity: 200 },
    { modelNumber: "Airbus A319neo", capacity: 156 },
    { modelNumber: "Boeing 737-800", capacity: 189 },
    { modelNumber: "Embraer 195", capacity: 124 },
    { modelNumber: "Bombardier CS300", capacity: 145 },
    { modelNumber: "Airbus A220-300", capacity: 160 },
    { modelNumber: "Boeing 737 MAX 9", capacity: 180 },
    { modelNumber: "Airbus A321neo", capacity: 230 },
    { modelNumber: "Boeing 777X", capacity: 426 },
    { modelNumber: "Airbus A350-1000", capacity: 369 },
    { modelNumber: "Boeing 787-10", capacity: 330 },
    { modelNumber: "Embraer E175", capacity: 88 },
    { modelNumber: "Bombardier CRJ200", capacity: 50 },
    { modelNumber: "Embraer ERJ-145", capacity: 50 },
    { modelNumber: "Bombardier Challenger 350", capacity: 10 },
    { modelNumber: "Gulfstream G650", capacity: 13 },
    { modelNumber: "Cessna Citation X", capacity: 8 },
    { modelNumber: "Dassault Falcon 7X", capacity: 12 },
    { modelNumber: "Boeing 777F", capacity: 102 },
    { modelNumber: "Airbus A330F", capacity: 70 },
    { modelNumber: "Boeing 767F", capacity: 58 },
    { modelNumber: "Antonov An-124", capacity: 120 },
    { modelNumber: "Lockheed C-130 Hercules", capacity: 92 },
    { modelNumber: "C-17 Globemaster III", capacity: 102 },
    { modelNumber: "Airbus A400M Atlas", capacity: 110 },
    { modelNumber: "Boeing P-8 Poseidon", capacity: 9 },
    { modelNumber: "Lockheed Martin F-35", capacity: 1 },
    { modelNumber: "Sukhoi Su-35", capacity: 1 },
    { modelNumber: "Boeing F/A-18 Super Hornet", capacity: 1 },
    { modelNumber: "Eurofighter Typhoon", capacity: 1 },
    { modelNumber: "Dassault Rafale", capacity: 1 },
    { modelNumber: "Airbus Beluga", capacity: 2 },
    { modelNumber: "Antonov An-225", capacity: 88 },
    { modelNumber: "Boeing Dreamlifter", capacity: 2 },
    { modelNumber: "Airbus A300-600ST Beluga", capacity: 2 },
    { modelNumber: "Learjet 75", capacity: 8 },
    { modelNumber: "HondaJet", capacity: 4 },
    { modelNumber: "HAL Tejas", capacity: 1 },
    { modelNumber: "Sukhoi Su-30MKI", capacity: 1 },
    { modelNumber: "MiG-29", capacity: 1 },
    { modelNumber: "Mitsubishi F-2", capacity: 1 },
    { modelNumber: "Pilatus PC-21", capacity: 2 },
    { modelNumber: "HAL Dhruv", capacity: 2 },
    { modelNumber: "Mi-17", capacity: 24 },
    { modelNumber: "Kamov Ka-52", capacity: 2 },
    { modelNumber: "Kawasaki P-1", capacity: 10 },
    { modelNumber: "Pilatus PC-6", capacity: 8 },
    { modelNumber: "HAL Light Combat Helicopter", capacity: 1 },
    { modelNumber: "Sukhoi Su-57", capacity: 1 },
    { modelNumber: "Mitsubishi X-2 Shinshin", capacity: 1 },
    { modelNumber: "Pilatus PC-7", capacity: 2 },
    { modelNumber: "HAL LCA Navy", capacity: 1 },
    { modelNumber: "MiG-31", capacity: 2 },
    { modelNumber: "Kawasaki C-2", capacity: 12 },
    { modelNumber: "Pilatus PC-12", capacity: 9 },
    { modelNumber: "HAL LCH", capacity: 1 },
    { modelNumber: "Tupolev Tu-160", capacity: 16 },
    { modelNumber: "Mitsubishi F-15J", capacity: 1 },
    { modelNumber: "Pilatus PC-9", capacity: 2 },
    { modelNumber: "HAL HTT-40", capacity: 2 },
    { modelNumber: "MiG-35", capacity: 1 },
  ];

  const cities = [
    { name: "Andhra Pradesh", code: "AP" },
    { name: "Arunachal Pradesh", code: "AR" },
    { name: "Assam", code: "AS" },
    { name: "Bihar", code: "BR" },
    { name: "Chhattisgarh", code: "CG" },
    { name: "Goa", code: "GA" },
    { name: "Gujarat", code: "GJ" },
    { name: "Haryana", code: "HR" },
    { name: "Himachal Pradesh", code: "HP" },
    { name: "Jharkhand", code: "JH" },
    { name: "Karnataka", code: "KA" },
    { name: "Kerala", code: "KL" },
    { name: "Madhya Pradesh", code: "MP" },
    { name: "Maharashtra", code: "MH" },
    { name: "Manipur", code: "MN" },
    { name: "Meghalaya", code: "ML" },
    { name: "Mizoram", code: "MZ" },
    { name: "Nagaland", code: "NL" },
    { name: "Odisha", code: "OD" },
    { name: "Punjab", code: "PB" },
    { name: "Rajasthan", code: "RJ" },
    { name: "Sikkim", code: "SK" },
    { name: "Tamil Nadu", code: "TN" },
    { name: "Telangana", code: "TS" },
    { name: "Tripura", code: "TR" },
    { name: "Uttar Pradesh", code: "UP" },
    { name: "Uttarakhand", code: "UK" },
    { name: "West Bengal", code: "WB" },
    { name: "Andaman and Nicobar Islands", code: "AN" },
    { name: "Chandigarh", code: "CH" },
    { name: "Dadra and Nagar Haveli and Daman and Diu", code: "DNHDD" },
    { name: "Delhi", code: "DL" },
    { name: "Jammu and Kashmir", code: "JK" },
    { name: "Ladakh", code: "LA" },
    { name: "Lakshadweep", code: "LD" },
    { name: "Puducherry", code: "PY" },
  ];

  await prisma.airplane.createMany({
    data: airplanes,
  });

  await prisma.city.createMany({
    data: cities,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
