export interface ITriggerResponse {
  _id: string;
  name: string;
  type: string;
  condition: string;
  profileId: string;
  actions: string[];
  createdAt: Date;
  updatedAt: Date;
}
