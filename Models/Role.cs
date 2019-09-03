﻿using System;
using System.Collections.Generic;

namespace no_mas_accidentes.Models
{
    public partial class Role
    {
        public Role()
        {
            Consultation = new HashSet<Consultation>();
            User = new HashSet<User>();
        }

        public decimal Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Consultation> Consultation { get; set; }
        public virtual ICollection<User> User { get; set; }
    }
}
