using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace no_mas_accidentes.Models
{
    public partial class ModelContext : DbContext
    {
        public ModelContext()
        {
        }

        public ModelContext(DbContextOptions<ModelContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Accident> Accident { get; set; }
        public virtual DbSet<Company> Company { get; set; }
        public virtual DbSet<Consultation> Consultation { get; set; }
        public virtual DbSet<Pay> Pay { get; set; }
        public virtual DbSet<Role> Role { get; set; }
        public virtual DbSet<User> User { get; set; }
        public virtual DbSet<Visit> Visit { get; set; }

        // Unable to generate entity type for table 'PORTAFOLIO2.IMPROVE'. Please see the warning messages.
        // Unable to generate entity type for table 'PORTAFOLIO2.TASK'. Please see the warning messages.
        // Unable to generate entity type for table 'PORTAFOLIO2.REQUEST_ACTIVITIES'. Please see the warning messages.

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseOracle("User Id=portafolio2;Password=123;Data Source=localhost:1521/xe;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("ProductVersion", "2.2.6-servicing-10079")
                .HasAnnotation("Relational:DefaultSchema", "PORTAFOLIO2");

            modelBuilder.Entity<Accident>(entity =>
            {
                entity.ToTable("ACCIDENT");

                entity.HasIndex(e => e.Id)
                    .HasName("ID_ACCIDENT_PK1")
                    .IsUnique();

                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .HasColumnType("NUMBER(38)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.DateAccident)
                    .HasColumnName("DATE_ACCIDENT")
                    .HasColumnType("TIMESTAMP(6)");

                entity.Property(e => e.IdCompany)
                    .HasColumnName("ID_COMPANY")
                    .HasColumnType("NUMBER(38)");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("NAME")
                    .HasColumnType("NVARCHAR2(255)");

                entity.Property(e => e.Resumen)
                    .IsRequired()
                    .HasColumnName("RESUMEN")
                    .HasColumnType("NVARCHAR2(255)");

                entity.Property(e => e.Severity)
                    .IsRequired()
                    .HasColumnName("SEVERITY")
                    .HasColumnType("NVARCHAR2(255)");

                entity.HasOne(d => d.IdCompanyNavigation)
                    .WithMany(p => p.Accident)
                    .HasForeignKey(d => d.IdCompany)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("ID_COMPANY_FK1");
            });

            modelBuilder.Entity<Company>(entity =>
            {
                entity.HasKey(e => e.Rut)
                    .HasName("ID_COMPANY_PK");

                entity.ToTable("COMPANY");

                entity.HasIndex(e => e.Rut)
                    .HasName("ID_COMPANY_PK")
                    .IsUnique();

                entity.Property(e => e.Rut)
                    .HasColumnName("RUT")
                    .HasColumnType("NUMBER(38)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.Address)
                    .IsRequired()
                    .HasColumnName("ADDRESS")
                    .HasColumnType("NVARCHAR2(255)");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasColumnName("EMAIL")
                    .HasColumnType("NVARCHAR2(255)");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("NAME")
                    .HasColumnType("NVARCHAR2(255)");

                entity.Property(e => e.Phone)
                    .IsRequired()
                    .HasColumnName("PHONE")
                    .HasColumnType("LONG");
            });

            modelBuilder.Entity<Consultation>(entity =>
            {
                entity.ToTable("CONSULTATION");

                entity.HasIndex(e => e.Id)
                    .HasName("ID_ASESORY_PK")
                    .IsUnique();

                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .HasColumnType("NUMBER(38)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.DateAsesory)
                    .HasColumnName("DATE_ASESORY")
                    .HasColumnType("TIMESTAMP(6)");

                entity.Property(e => e.IdProfesional)
                    .HasColumnName("ID_PROFESIONAL")
                    .HasColumnType("NUMBER(38)");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("NAME")
                    .HasColumnType("NVARCHAR2(255)");

                entity.Property(e => e.Resumen)
                    .IsRequired()
                    .HasColumnName("RESUMEN")
                    .HasColumnType("NVARCHAR2(500)");

                entity.HasOne(d => d.IdProfesionalNavigation)
                    .WithMany(p => p.Consultation)
                    .HasForeignKey(d => d.IdProfesional)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("ID_PROFESSIONAL_FK1");
            });

            modelBuilder.Entity<Pay>(entity =>
            {
                entity.ToTable("PAY");

                entity.HasIndex(e => e.Id)
                    .HasName("ID_PAY_PK")
                    .IsUnique();

                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .HasColumnType("NUMBER(38)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.Cost)
                    .HasColumnName("COST")
                    .HasColumnType("NUMBER(38)");

                entity.Property(e => e.DatePay)
                    .HasColumnName("DATE_PAY")
                    .HasColumnType("TIMESTAMP(6)");

                entity.Property(e => e.IdCompany)
                    .HasColumnName("ID_COMPANY")
                    .HasColumnType("NUMBER(38)");

                entity.HasOne(d => d.IdCompanyNavigation)
                    .WithMany(p => p.Pay)
                    .HasForeignKey(d => d.IdCompany)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("ID_COMPANY2");
            });

            modelBuilder.Entity<Role>(entity =>
            {
                entity.ToTable("role");

                entity.HasIndex(e => e.Id)
                    .HasName("ID_ROLE_PK")
                    .IsUnique();

                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .HasColumnType("NUMBER(38)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("NAME")
                    .HasColumnType("NVARCHAR2(255)");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("user");

                entity.HasIndex(e => e.Id)
                    .HasName("ID_USER_PK")
                    .IsUnique();

                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .HasColumnType("NUMBER(38)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasColumnName("EMAIL")
                    .HasColumnType("NVARCHAR2(255)");

                entity.Property(e => e.IdRole)
                    .HasColumnName("ID_ROLE")
                    .HasColumnType("NUMBER(38)");

                entity.Property(e => e.Lastname)
                    .IsRequired()
                    .HasColumnName("LASTNAME")
                    .HasColumnType("NVARCHAR2(255)");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("NAME")
                    .HasColumnType("NVARCHAR2(255)");

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasColumnName("PASSWORD")
                    .HasColumnType("NVARCHAR2(255)");

                entity.Property(e => e.Phone)
                    .IsRequired()
                    .HasColumnName("PHONE")
                    .HasColumnType("LONG");

                entity.HasOne(d => d.IdRoleNavigation)
                    .WithMany(p => p.User)
                    .HasForeignKey(d => d.IdRole)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("ID_ROL_FK");
            });

            modelBuilder.Entity<Visit>(entity =>
            {
                entity.ToTable("VISIT");

                entity.HasIndex(e => e.Id)
                    .HasName("ID_VISIT_PK")
                    .IsUnique();

                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .HasColumnType("NUMBER(38)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.DateVisit)
                    .HasColumnName("DATE_VISIT")
                    .HasColumnType("TIMESTAMP(6)");

                entity.Property(e => e.IdCompany)
                    .HasColumnName("ID_COMPANY")
                    .HasColumnType("NUMBER(38)");

                entity.Property(e => e.IdProfessional)
                    .HasColumnName("ID_PROFESSIONAL")
                    .HasColumnType("NUMBER(38)");

                entity.Property(e => e.MeetingNumber)
                    .HasColumnName("MEETING_NUMBER")
                    .HasColumnType("NUMBER(38)");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("NAME")
                    .HasColumnType("NVARCHAR2(255)");

                entity.HasOne(d => d.IdCompanyNavigation)
                    .WithMany(p => p.Visit)
                    .HasForeignKey(d => d.IdCompany)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("ID_COMPANY_FK");

                entity.HasOne(d => d.IdProfessionalNavigation)
                    .WithMany(p => p.Visit)
                    .HasForeignKey(d => d.IdProfessional)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("ID_PROFESSIONAL_FK");
            });

            modelBuilder.HasSequence("ISEQ$$_74654");

            modelBuilder.HasSequence("ISEQ$$_74657");

            modelBuilder.HasSequence("ISEQ$$_74661");

            modelBuilder.HasSequence("ISEQ$$_74666");

            modelBuilder.HasSequence("ISEQ$$_74668");

            modelBuilder.HasSequence("ISEQ$$_74673");

            modelBuilder.HasSequence("ISEQ$$_74676");

            modelBuilder.HasSequence("ISEQ$$_74679");

            modelBuilder.HasSequence("ISEQ$$_74682");

            modelBuilder.HasSequence("ISEQ$$_74685");
        }
    }
}
