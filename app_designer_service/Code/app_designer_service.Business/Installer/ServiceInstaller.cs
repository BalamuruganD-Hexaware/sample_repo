using app_designer_service.Data.Installer;
using Microsoft.Extensions.DependencyInjection;
using Scrutor;
namespace app_designer_service.Business.Installer
{
    public class ServiceInstaller
    {
        private IServiceCollection _service;
        public ServiceInstaller(IServiceCollection service)
        {
            _service = service;
        }

        public void Install()
        {
            _service.Scan(scan => scan
                                    .FromAssemblyOf<ServiceInstaller>()
                                    .AddClasses()
                                    .AsImplementedInterfaces()
                                    .WithScopedLifetime());
            var dataInstaller = new DataInstaller(_service);
            dataInstaller.Install();
        }
    }
}
