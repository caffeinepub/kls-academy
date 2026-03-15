import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Notice {
    title: string;
    content: string;
    date: string;
}
export interface backendInterface {
    addCertificate(id: string, holderName: string, course: string, issuedDate: string, verified: boolean): Promise<void>;
    addNotice(title: string, content: string, date: string): Promise<void>;
    addResult(rollNumber: string, marks: bigint, status: string): Promise<void>;
    addStudentCredential(username: string, password: string): Promise<void>;
    checkResult(rollNumber: string): Promise<[bigint, string]>;
    getNotices(): Promise<Array<Notice>>;
    studentLogin(username: string, password: string): Promise<boolean>;
    submitApplication(name: string, email: string, phone: string, course: string, address: string, dob: string): Promise<void>;
    submitContactMessage(name: string, email: string, message: string, date: string): Promise<void>;
    verifyCertificate(id: string): Promise<[boolean, string]>;
}
