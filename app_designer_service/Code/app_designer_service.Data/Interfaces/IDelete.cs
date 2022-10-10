namespace app_designer_service.Data.Interfaces
{
    public interface IDelete<T>
    {
        bool Delete(T id);
    }
}
