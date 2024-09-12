// types.ts
export type Trajectory = {
    taxi_id: number;
    plate: string;
    date: string;
    latitude: number;
    longitude: number;
};

export type CreateUser = {
    name: string;
    email: string;
    password: string;
}