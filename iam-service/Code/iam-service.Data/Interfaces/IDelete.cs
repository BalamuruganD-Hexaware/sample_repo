namespace iam-service.Data.Interfaces
{
    public interface IDelete<T>
    {
        bool Delete(T id);
    }
}
