using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(NathanHering.Startup))]
namespace NathanHering
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
