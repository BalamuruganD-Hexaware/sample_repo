using System.Collections.Generic;

namespace manageeeeservice.Data.Interfaces
{
    public interface IGetAll<T> where T : class
    {
        IEnumerable<T> GetAll();
    }
}
