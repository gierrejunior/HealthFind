/**
 * Represent a service that can be executed.
 *
 * Services should be used to encapsulate business logic.
 */
export interface Service {
    /**
     * Execute the service.
     *
     * @param args - The arguments the service needs to execute.
     *
     * @returns The result of the service.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    execute: (...args: any[]) => Promise<any>;
}
