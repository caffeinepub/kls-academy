import { useMutation, useQuery } from "@tanstack/react-query";
import { useActor } from "./useActor";

export function useGetNotices() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["notices"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getNotices();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitApplication() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (data: {
      name: string;
      email: string;
      phone: string;
      course: string;
      address: string;
      dob: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitApplication(
        data.name,
        data.email,
        data.phone,
        data.course,
        data.address,
        data.dob,
      );
    },
  });
}

export function useStudentLogin() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (data: { username: string; password: string }) => {
      if (!actor) throw new Error("Not connected");
      return actor.studentLogin(data.username, data.password);
    },
  });
}

export function useCheckResult() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (rollNumber: string) => {
      if (!actor) throw new Error("Not connected");
      return actor.checkResult(rollNumber);
    },
  });
}

export function useVerifyCertificate() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Not connected");
      return actor.verifyCertificate(id);
    },
  });
}

export function useSubmitContactMessage() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (data: {
      name: string;
      email: string;
      message: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      const date = new Date().toISOString();
      return actor.submitContactMessage(
        data.name,
        data.email,
        data.message,
        date,
      );
    },
  });
}

export function useAddResult() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (data: {
      rollNumber: string;
      marks: number;
      status: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.addResult(data.rollNumber, BigInt(data.marks), data.status);
    },
  });
}
