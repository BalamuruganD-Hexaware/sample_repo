namespace app-designer-service.Data.Interfaces
{
    public interface IDelete<T>
    {
        bool Delete(T id);
    }
}
