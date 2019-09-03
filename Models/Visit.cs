using System;
using System.Collections.Generic;

namespace no_mas_accidentes.Models
{
    public partial class Visit
    {
        public decimal Id { get; set; }
        public string Name { get; set; }
        public decimal MeetingNumber { get; set; }
        public DateTime DateVisit { get; set; }
        public decimal IdProfessional { get; set; }
        public decimal IdCompany { get; set; }

        public virtual Company IdCompanyNavigation { get; set; }
        public virtual User IdProfessionalNavigation { get; set; }
    }
}
