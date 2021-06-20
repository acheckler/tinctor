const dummyStore = {
  cannabinoids: [
    { id: "1052", name: "CBD Isolate (K)", ppg: 0.56 },
    {
      id: "1053",
      name: "Crude CBD Extract (WHS)",
      ppg: 0.64,
    },
    {
      id: "1054",
      name: "CBD Distillate (WHS)",
      ppg: 0.72,
    },
    {
      id: "1055",
      name: "Broad Spectrum CBD Distillate (GL)",
      ppg: 2.27,
    },
    {
      id: "1072",
      name: "Water Soluble CBD Isolate (MHL)",
      ppg: 12.5,
    },
    {
      id: "1060",
      name: "CBC Isolate - (K)",
      ppg: 21.0,
    },
    {
      id: "1061",
      name: "CBN Isolate - (K)",
      ppg: 8.16,
    },
  ],
  carriers: [
    { id: "MCT", name: "Organic MCT Oil", ppg: 0.011 },
    { id: "HS", name: "Organic Hemp Seed Oil", ppg: 0.011 },
    { id: "JOJO", name: "Organic Golden Jojoba Oil", ppg: 0.019 },
    { id: "COCO", name: "Organic Extra Virgin Coconut Oil", ppg: 0.01 },
  ],

  flavors: [
    { id: "ORG", flavor: "Orange", ppg: 0.029 },
    { id: "LEM", flavor: "Lemon", ppg: 0.1 },
    { id: "BS", flavor: "Black Seed", ppg: 0.026 },
    { id: "PP", flavor: "Peppermint", ppg: 0.173 },
    { id: "LG", flavor: "Lemongrass", ppg: 1.479 },
  ],
  bottles: [
    { id: "BT01", name: "30mL Amber Boston Round", cpu: 0.09 },
    { id: "BT05", name: "30mL Frosted Amber Rectangle", cpu: 0.31 },
    { id: "BT03", name: "60mL Amber Boston Round", cpu: 0.12 },
  ],
  droppers: [
    { id: "D01", name: "30mL Graduated", cpu: 0.48 },
    { id: "D02", name: "60mL Graduated", cpu: 0.16 },
  ],
  projects: [
    {
      id: 1,
      name: "'Clarity' 1000mg",
      tincVolume: 30,
      cannaId: "1055",
      cannaConcentration: 1000,
      carrierId: "MCT",
      carrierConcentration: 100,
      flavorId: "LEM",
      bottleId: "BT05",
      dropperId: "D01",
      totalCPU: 2.6,
    },
  ],
};

export default dummyStore;
