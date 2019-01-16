import { StockXService } from '../src/services/StockX.service';

suite('StockX Service', () => {
  const stockXService = new StockXService();
  test('Should fetch JWT token', async () => {
    const jwt = await stockXService.login(
      'sneakertradingllc@gmail.com',
      'KPIjobZp2RaWFIs4XFT12gyyemxfNWa2DLaziwzg'
    );
    console.log(jwt);
  });
});
