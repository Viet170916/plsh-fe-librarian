import * as signalR from "@microsoft/signalr";
import {useEffect, useState} from "react";

type UseSignalROptions = {
    group?: string;
    joinGroupMethod?: string;
    leaveGroupMethod?: string;
};

export function useSignalR<T>(
    hubUrl: string,
    methodName: string,
    options?: UseSignalROptions,
) {
    const [data, setData] = useState<T | null>(null);
    const [connection, setConnection] = useState<signalR.HubConnection | null>(
        null,
    );
    useEffect(() => {
        const connection = new signalR.HubConnectionBuilder()
            .withUrl(`${process.env.NEXT_PUBLIC_SERVER_HOST}/${hubUrl}`, {
                accessTokenFactory: () => localStorage.getItem("token") ?? "",
            })
            .withAutomaticReconnect()
            .build();
        const start = async () => {
            try {
                await connection.start();
                setConnection(connection);
                if (options?.group) {
                    await connection.invoke(
                        options.joinGroupMethod ?? "JoinGroup",
                        options.group,
                    );
                }
                connection.on(methodName, (message: T) => {
                    setData(message);
                });
            } catch (err) {
                console.error("SignalR connection error:", err);
            }
        };
        start();
        return () => {
            connection.off(methodName);
            if (options?.group) {
                connection
                    .invoke(options.leaveGroupMethod ?? "LeaveGroup", options.group)
                    .catch(() => {
                    });
            }
            connection.stop().catch(() => {
            });
        };
    }, [hubUrl, methodName, options?.group, options?.joinGroupMethod, options?.leaveGroupMethod]);
    return {data, connection};
}
