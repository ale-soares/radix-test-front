export type equipmentId = string;

export type SensorData = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;
  _id: string;
  equipmentId: equipmentId;
  timestamp: Date;
  value: number;
};
