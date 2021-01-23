using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TestTask.Models
{
	public class CSV
	{
		public Guid Id { get; set; }
		public string Name { get; set; }
		public string Phone { get; set; }
		public DateTime DateOfBirth { get; set; }
		public bool Married { get; set; }
		public double Salary { get; set; }
	}
}
