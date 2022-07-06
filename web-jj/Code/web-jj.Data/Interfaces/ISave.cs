namespace web-jj.Data.Interfaces
{
    public interface ISave<in T> where T : class
    {
        bool Save(T entity);
    }
}
