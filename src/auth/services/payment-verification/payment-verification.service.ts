import { Injectable } from "@nestjs/common";
import { PaymentStatus, SubscriptionStatus } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class PaymentVerificationService {
    constructor(private prisma: PrismaService) {}

    async hasPendingPayments(cityId: string | null): Promise<boolean> {
        // Se `cityId` for nulo (por exemplo, se o usuário for ADMIN), ignorar a verificação de pagamento
        if (!cityId) return false;

        // Verifica a assinatura da cidade
        const subscription = await this.prisma.subscription.findUnique({
            where: { cityId },
        });

        // Se a assinatura não existir ou não estiver ativa, o acesso é bloqueado
        if (!subscription || subscription.status !== SubscriptionStatus.ACTIVE) {
            return true; // Retorna true para indicar restrição devido à assinatura inativa
        }

        // Busca pagamentos pendentes para a assinatura ativa
        const unpaidPayments = await this.prisma.payment.findMany({
            where: {
                subscriptionId: subscription.id,
                status: PaymentStatus.PENDING, // Verifica se o status do pagamento está pendente
                dueDate: { lte: new Date() }, // Somente pagamentos já vencidos
            },
        });

        // Retorna true se houver pagamentos pendentes, indicando bloqueio de acesso
        return unpaidPayments.length > 0;
    }
}
