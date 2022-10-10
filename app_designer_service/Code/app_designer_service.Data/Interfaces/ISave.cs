namespace app_designer_service.Data.Interfaces
{
    public interface ISave<in T> where T : class
    {
        bool Save(T entity);
    }
}
