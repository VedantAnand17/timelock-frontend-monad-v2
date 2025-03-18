export async function GET() {
  const tradingViewConfig = {
    supported_resolutions: ["1", "5", "15", "60", "240", "D"],
    intraday_multipliers: ["1", "60", "D"],
    supports_group_request: true,
    supports_marks: false,
    supports_search: false,
    supports_timescale_marks: false,
    supports_time: false,
  };

  return Response.json(tradingViewConfig);
}
