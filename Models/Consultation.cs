using System;
using System.Collections.Generic;

namespace no_mas_accidentes.Models
{
    public partial class Consultation
    {
        public decimal Id { get; set; }
        public string Name { get; set; }
        public DateTime DateAsesory { get; set; }
        public string Resumen { get; set; }
        public decimal IdProfesional { get; set; }

        public virtual Role IdProfesionalNavigation { get; set; }
    }
}
