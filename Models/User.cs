﻿using System;
using System.Collections.Generic;

namespace no_mas_accidentes.Models
{
    public partial class User
    {
        public User()
        {
            Visit = new HashSet<Visit>();
        }

        public decimal Id { get; set; }
        public string Name { get; set; }
        public string Lastname { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public decimal IdRole { get; set; }
        public string Password { get; set; }

        public virtual Role IdRoleNavigation { get; set; }
        public virtual ICollection<Visit> Visit { get; set; }
    }
}
