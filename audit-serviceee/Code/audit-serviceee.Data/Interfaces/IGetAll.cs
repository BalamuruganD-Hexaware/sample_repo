using System.Collections.Generic;

namespace audit-serviceee.Data.Interfaces
{
    public interface IGetAll<T> where T : class
    {
        IEnumerable<T> GetAll();
    }
}
