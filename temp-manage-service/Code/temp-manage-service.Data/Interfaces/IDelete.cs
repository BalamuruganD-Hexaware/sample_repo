namespace temp-manage-service.Data.Interfaces
{
    public interface IDelete<T>
    {
        bool Delete(T id);
    }
}
