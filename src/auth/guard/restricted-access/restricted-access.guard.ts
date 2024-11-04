import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { PaymentVerificationService } from "src/auth/services/payment-verification/payment-verification.service";

@Injectable()
export class RestrictedAccessGuard implements CanActivate {
    constructor(
        private readonly paymentVerificationService: PaymentVerificationService, // Injeta o serviço de verificação de pagamento
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const user = request.user;

        // Verifique se o usuário está presente (assumindo que o JWTGuard já autenticou)
        if (!user) {
            throw new ForbiddenException("Acesso negado. Usuário não autenticado.");
        }

        // Pega o cityId do usuário
        const cityId = user.cityId;

        // Verifica se há pagamentos pendentes para o cityId do usuário
        const hasPendingPayments = await this.paymentVerificationService.hasPendingPayments(cityId);

        if (hasPendingPayments) {
            throw new ForbiddenException("Acesso restrito. Por favor, regularize seu pagamento.");
        }

        return true;
    }
}
