import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const transactionId = searchParams.get("transactionId");
  const amount = searchParams.get("amount");
  const encodedOrderInfo = searchParams.get("orderInfo");
  const redirectUrl = searchParams.get("redirectUrl");
  const callbackUrl = searchParams.get("callbackUrl");

  let orderInfo;
  try {
    orderInfo = encodedOrderInfo
      ? JSON.parse(decodeURIComponent(encodedOrderInfo))
      : {};
  } catch (error) {
    console.error("Error parsing orderInfo:", error);
    orderInfo = {};
  }

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Mock PhonePe Payment</title>
      <style>
        body { font-family: Arial, sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; background-color: #f0f0f0; }
        .container { text-align: center; padding: 40px; border: 1px solid #ccc; border-radius: 10px; background-color: white; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        h1 { color: #5f259f; }
        p { margin: 10px 0; }
        button { margin: 10px; padding: 12px 24px; font-size: 16px; cursor: pointer; border: none; border-radius: 5px; transition: background-color 0.3s; }
        .success { background-color: #4CAF50; color: white; }
        .failure { background-color: #f44336; color: white; }
        .success:hover { background-color: #45a049; }
        .failure:hover { background-color: #da190b; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Mock PhonePe Payment</h1>
        <p>Transaction ID: ${transactionId}</p>
        <p>Amount: ₹${parseInt(amount as string) / 100}</p>
        <button class="success" onclick="simulatePayment('success')">Simulate Success</button>
        <button class="failure" onclick="simulatePayment('failure')">Simulate Failure</button>
      </div>
      <script>
        function simulatePayment(status) {
          const redirectUrl = new URL('${
            redirectUrl ||
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/phone-pay-callback`
          }');
          const callbackUrl = new URL('${
            callbackUrl ||
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/phone-pay-callback`
          }');
          
          const params = new URLSearchParams({
            code: status === 'success' ? 'PAYMENT_SUCCESS' : 'PAYMENT_ERROR',
            transactionId: '${transactionId}',
            amount: '${amount}',
            orderInfo: '${encodedOrderInfo}'
          });

          redirectUrl.search = params.toString();
          callbackUrl.search = params.toString();

          // Simulate callback
          fetch(callbackUrl.toString(), { method: 'POST' })
            .then(response => response.json())
            .then(data => console.log('Callback response:', data))
            .catch(error => console.error('Callback error:', error));

          // Redirect to the redirectUrl
          window.location.href = redirectUrl.toString();
        }
      </script>
    </body>
    </html>
  `;

  return new NextResponse(html, {
    headers: { "Content-Type": "text/html" },
  });
}
