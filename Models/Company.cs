using System;
using System.Collections.Generic;

namespace no_mas_accidentes.Models
{
    public partial class Company
    {
        public Company()
        {
            Accident = new HashSet<Accident>();
            Pay = new HashSet<Pay>();
            Visit = new HashSet<Visit>();
        }

        public decimal Rut { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }

        public virtual ICollection<Accident> Accident { get; set; }
        public virtual ICollection<Pay> Pay { get; set; }
        public virtual ICollection<Visit> Visit { get; set; }
    }
}
