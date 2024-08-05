export type equipmentId = string;

export type SensorData = {
  _id: string;
  equipmentId: equipmentId;
  timestamp: Date;
  value: number;
};
