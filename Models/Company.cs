using System;
using System.Collections.Generic;

namespace no_mas_accidentes.Modelss
{
    public partial class Company
    {
        public Company()
        {
            Accident = new HashSet<Accident>();
            Consultation = new HashSet<Consultation>();
            Pay = new HashSet<Pay>();
            Visit = new HashSet<Visit>();
        }

        public decimal Rut { get; set; }
        public string SocialReason { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public string ComercialBusiness { get; set; }
        public string Phone { get; set; }
        public decimal Id_role { get; set; }
        public string Password { get; set; }

        public virtual Role IdRoleNavigation { get; set; }
        public virtual ICollection<Accident> Accident { get; set; }
        public virtual ICollection<Consultation> Consultation { get; set; }
        public virtual ICollection<Pay> Pay { get; set; }
        public virtual ICollection<Visit> Visit { get; set; }
    }
}
