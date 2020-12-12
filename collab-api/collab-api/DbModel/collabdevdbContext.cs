using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace collab_api.DbModel
{
    public partial class collabdevdbContext : DbContext
    {
        public collabdevdbContext()
        {
        }

        public collabdevdbContext(DbContextOptions<collabdevdbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<UserProfile> UserProfile { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                // TODO: store in config
                optionsBuilder.UseSqlServer("Server=tcp:collab-dev-db.database.windows.net,1433;Initial Catalog=collab-dev-db;Persist Security Info=False;User ID=CollabAdmin;Password=Iamcollab@15;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserProfile>(entity =>
            {
                entity.ToTable("userProfile");

                entity.HasIndex(e => new { e.Email, e.Phone })
                    .HasName("uidx_unique_user")
                    .IsUnique();

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.AboutMe)
                    .HasColumnName("aboutMe")
                    .HasMaxLength(500);

                entity.Property(e => e.Address)
                    .HasColumnName("address")
                    .HasMaxLength(500);

                entity.Property(e => e.City)
                    .HasColumnName("city")
                    .HasMaxLength(100);

                entity.Property(e => e.Country)
                    .HasColumnName("country")
                    .HasMaxLength(100);

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasColumnName("email")
                    .HasMaxLength(100);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("name")
                    .HasMaxLength(100);

                entity.Property(e => e.Phone)
                    .IsRequired()
                    .HasColumnName("phone")
                    .HasMaxLength(20);

                entity.Property(e => e.PostalCode)
                    .HasColumnName("postalCode")
                    .HasMaxLength(20);

                entity.Property(e => e.Pwd)
                    .IsRequired()
                    .HasColumnName("pwd");

                entity.Property(e => e.UserName)
                    .HasColumnName("userName")
                    .HasMaxLength(100);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
