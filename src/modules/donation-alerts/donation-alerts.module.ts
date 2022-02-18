import { Module } from '@nestjs/common';
import { DonationAlertsService } from '@modules/donation-alerts/donation-alerts.service';

@Module({
  providers: [DonationAlertsService],
})
export class DonationAlertsModule {}
