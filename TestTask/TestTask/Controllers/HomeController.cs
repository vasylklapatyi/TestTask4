using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Bogus;
using TestTask.Models;
using TestTaskWebApp1;

namespace TestTask.Controllers
{
	[Route("api/[controller]/[action]")]
	[ApiController]
	public class HomeController : ControllerBase
	{
		public DbEntities context { get; set; }
		public HomeController(DbEntities _context)
		{

			//uncomment this field to fill the database with data
			//FillDatabase(100);
			context = _context;
		}
		[HttpGet]
		public ActionResult GetGridData()
		{
			return new JsonResult(context.CSVs.ToList());
		}


		#region Privates
		private void FillDatabase(int count)
		{
			var rng = new Random();
			int _tempsalary;
			var data =  Enumerable.Range(1, count).Select(index => new CSV()
			{
				Id = Guid.NewGuid(),
				Name = (new Bogus.Person()).FirstName,
				DateOfBirth = (new Bogus.Person()).DateOfBirth,
				Married = rng.Next() % 2 == 0 ? true : false,
				Phone = (new Bogus.Person()).Phone,
				Salary = (_tempsalary = rng.Next(1000, 10000)) - (_tempsalary % 500)
			})
			.ToList();
			context.AddRange(data);
			context.SaveChanges();
		}
		#endregion
	}
}
