using System.Web.Mvc;

namespace NathanHering.Areas.SlotMachine
{
    public class SlotMachineAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "SlotMachine";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            context.MapRoute(
                "SlotMachine_default",
                "SlotMachine/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}