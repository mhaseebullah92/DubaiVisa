using DubaiVisa.Data;
using DubaiVisa.Models.Domain;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Stripe;

namespace DubaiVisa.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class PaymentApiController : Controller
    {


        private readonly AppDBContext appDBContext;
        public PaymentApiController(AppDBContext appDBContext)
        {
            this.appDBContext = appDBContext;
        }

        [HttpPost("intent-req")]
        public ActionResult Create(PaymentIntentCreateRequest request)
        {
            try
            {
                var plan = appDBContext.VisaPlans.Find(request.Item.Id) ?? throw new Exception("Plan not found");
                Guid[] addonids = request.Item.addonIds;
                var addons = appDBContext.AddOns.Where(entity => addonids.Contains(entity.Id)).ToList();
                var paymentIntentService = new PaymentIntentService();
                var paymentIntent = paymentIntentService.Create(new PaymentIntentCreateOptions
                {
                    Amount = CalculateOrderAmount(plan, addons, request.Item.moneytype),
                    Currency = request.Item.moneytype,
                    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
                    AutomaticPaymentMethods = new PaymentIntentAutomaticPaymentMethodsOptions
                    {
                        Enabled = true,
                    },
                });

                return Json(new { clientSecret = paymentIntent.ClientSecret });
            }catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        private int CalculateOrderAmount(VisaPlan plan,List<AddOn> addOns, string moneytype)
        {
            // Replace this constant with a calculation of the order's amount
            // Calculate the order total on the server to prevent
            // people from directly manipulating the amount on the client
            decimal total = 0;
            total += moneytype == "usd" ? plan.UsdPrice : plan.AedPrice;
            foreach (var addon in addOns)
            {
                var money = moneytype == "usd" ? addon.UsdPrice : addon.AedPrice;
                total += money;
            }
            return Convert.ToInt32(total)*100;
        }
    }

    public class Item
    {
        [JsonProperty("id")]
        public Guid Id { get; set; }
        [JsonProperty("Amount")]
        public string Amount { get; set; }
        [JsonProperty("addonIds")]
        public Guid[] addonIds { get; set; }
        [JsonProperty("moneytype")]
        public string moneytype { get; set; }

    }

    public class PaymentIntentCreateRequest
    {

        [JsonProperty("items")]
        public Item Item { get; set; }
    }
}
