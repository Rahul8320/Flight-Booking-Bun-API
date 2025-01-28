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
    { name: "Ahmedabad", code: "AMD" },
    { name: "Agartala", code: "IXA" },
    { name: "Aizawl", code: "AJL" },
    { name: "Akola", code: "AKD" },
    { name: "Allahabad", code: "IXD" },
    { name: "Along", code: "IXV" },
    { name: "Amravati", code: "ATW" },
    { name: "Amritsar", code: "ATQ" },
    { name: "Bagdogra", code: "IXB" },
    { name: "Bangalore", code: "BLR" },
    { name: "Bhagalpur", code: "BUP" },
    { name: "Bhopal", code: "BHO" },
    { name: "Bhubaneswar", code: "BBI" },
    { name: "Coimbatore", code: "CJB" },
    { name: "Darbhanga", code: "DBR" },
    { name: "Delhi", code: "DEL" },
    { name: "Deoghar", code: "DGH" },
    { name: "Dharamshala", code: "DHM" },
    { name: "Dibrugarh", code: "DIB" },
    { name: "Dimapur", code: "DMU" },
    { name: "Durgapur", code: "RDP" },
    { name: "Gaya", code: "GAY" },
    { name: "Goa", code: "GOI" },
    { name: "Gorakhpur", code: "GOP" },
    { name: "Guwahati", code: "GAU" },
    { name: "Hubli", code: "HBX" },
    { name: "Hyderabad", code: "HYD" },
    { name: "Imphal", code: "IMF" },
    { name: "Indore", code: "IDR" },
    { name: "Itanagar", code: "HJR" },
    { name: "Jaisalmer", code: "JSA" },
    { name: "Jalandhar", code: "IAP" },
    { name: "Jalgaon", code: "JLN" },
    { name: "Jammu", code: "IXJ" },
    { name: "Jodhpur", code: "JDH" },
    { name: "Jorhat", code: "JRH" },
    { name: "Kadapa", code: "CDP" },
    { name: "Kakinada", code: "COA" },
    { name: "Kannur", code: "CNN" },
    { name: "Kanpur", code: "KNU" },
    { name: "Kochi", code: "COK" },
    { name: "Kolkata", code: "CCU" },
    { name: "Kota", code: "KTU" },
    { name: "Kozhikode", code: "CCJ" },
    { name: "Kullu", code: "KUU" },
    { name: "Kurnool", code: "KJL" },
    { name: "Leh", code: "IXL" },
    { name: "Lilabari", code: "IXI" },
    { name: "Ludhiana", code: "LUH" },
    { name: "Madurai", code: "IXM" },
    { name: "Mangaluru", code: "IXE" },
    { name: "Mumbai", code: "BOM" },
    { name: "Muzaffarpur", code: "MZU" },
    { name: "Mysore", code: "MYQ" },
    { name: "Nagpur", code: "NAG" },
    { name: "Nashik", code: "ISK" },
    { name: "Nellore", code: "IXU" },
    { name: "Pasighat", code: "IXT" },
    { name: "Pathankot", code: "IXP" },
    { name: "Patna", code: "PAT" },
    { name: "Pune", code: "PNQ" },
    { name: "Purnea", code: "PUN" },
    { name: "Rajahmundry", code: "RJA" },
    { name: "Raipur", code: "RPR" },
    { name: "Ranchi", code: "IXR" },
    { name: "Salem", code: "SXV" },
    { name: "Shillong", code: "SHL" },
    { name: "Shimla", code: "SLV" },
    { name: "Shirdi", code: "SAG" },
    { name: "Silchar", code: "IXS" },
    { name: "Solapur", code: "SSE" },
    { name: "Srinagar", code: "SXR" },
    { name: "Tezpur", code: "TEZ" },
    { name: "Thiruvananthapuram", code: "TRV" },
    { name: "Tirupati", code: "TIR" },
    { name: "Tuticorin", code: "TCR" },
    { name: "Udaipur", code: "UDR" },
    { name: "Vadodara", code: "BDQ" },
    { name: "Varanasi", code: "VNS" },
    { name: "Vijayawada", code: "VGA" },
    { name: "Visakhapatnam", code: "VTZ" },
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
