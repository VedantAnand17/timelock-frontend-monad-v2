export async function GET() {
  const tradingViewConfig = {
    supported_resolutions: ["60", "1D"],
    supports_group_request: true,
    supports_marks: false,
    supports_search: false,
    supports_timescale_marks: false,
    supports_time: false,
  };

  return Response.json(tradingViewConfig);
}
