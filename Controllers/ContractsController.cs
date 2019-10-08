using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using no_mas_accidentes.Models12;
using Oracle.ManagedDataAccess.Client;

namespace no_mas_accidentes.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContractsController : ControllerBase
    {
        private readonly ModelContext _context;

        public ContractsController(ModelContext context)
        {
            _context = context;
        }

        // GET: api/Contracts
        [Route("doContract")]
        [HttpPost]
        public JsonResult DoContract([FromBody]JObject data)
        {
            try
            {
                int price = data["price"].ToObject<int>();
                int number_visit = data["number_visit"].ToObject<int>();
                int number_asesory = data["number_asesory"].ToObject<int>();
                int rut_company = data["rut_company"].ToObject<int>();

                var con = new
                {
                    price,
                    number_visit,
                    number_asesory,
                    rut_company
                };

                //await _context.SaveChangesAsync();
                OracleParameter param_price = new OracleParameter("v_price", OracleDbType.Int32, con.price, ParameterDirection.Input);
                OracleParameter param_number_visit = new OracleParameter("v_number_visit", OracleDbType.Long, con.number_visit, ParameterDirection.Input);
                OracleParameter param_number_asesory = new OracleParameter("v_number_asesory", OracleDbType.Long, con.number_asesory, ParameterDirection.Input);
                OracleParameter param_rut_company = new OracleParameter("v_rut_company", OracleDbType.Long, con.rut_company, ParameterDirection.Input);

                object[] parameters = new object[] {
                    param_price,
                    param_number_visit,
                    param_number_asesory,
                    param_rut_company
                };

                string query = "begin pkg_do_contract.sp_do_contract(:v_price,:v_number_visit,:v_number_asesory,:v_rut_company); end; ";

                int success123 = _context.Database.ExecuteSqlCommand(query, parameters);

                var response = new
                {
                    success = true,
                    data = 123
                };
                return new JsonResult(response);
            }
            catch
            {
                var response = new
                {
                    success = false,
                    data = 123
                };
                return new JsonResult(response);
            }
        }

        [HttpGet("getAllContracts")]
        public async Task<JsonResult> GetAllContracts()
        {
            return new JsonResult(await _context.Contract.ToListAsync());
            //return new JsonResult(from us in _context.User select us);
        }

        [HttpGet("getContract/{rut}")]
        public async Task<JsonResult> GetContract(decimal rut)
        {
            return new JsonResult(from com in _context.Contract
                                  where com.RutCompany == rut
                                  select com);
        }

        [HttpPost("deleteContract/{id}")]
        public async Task<JsonResult> DeleteContract(decimal id)
        {
            //return new JsonResult(await _context.User.ToListAsync());

            Contract com = await _context.Contract.FindAsync(id);

            if (com == null)
            {
                return new JsonResult(new
                {
                    success = false,
                    message = "No se ha podido eliminar"
                });
            }
            _context.Contract.Remove(com);
            await _context.SaveChangesAsync();
            return new JsonResult(new
            {
                success = true,
                message = "Se ha eliminado satisfactoriamente"
            });
        }

        [HttpPost("updateContract/{id}")]
        public async Task<JsonResult> UpdateContract(decimal id, JObject data)
        {
            Contract contractFound = await _context.Contract.FindAsync(id);

            if (contractFound == null)
            {
                return new JsonResult(new
                {
                    success = false,
                    message = "No se ha podido actualizar"
                });
            }

            int price = data["price"].ToObject<int>();
            int number_visit = data["number_visit"].ToObject<int>();
            int number_asesory = data["number_asesory"].ToObject<int>();
            
            var com = new
            {
                price,
                number_visit,
                number_asesory
            };

            contractFound.Price = com.price;
            contractFound.NumberAsesory = com.number_asesory;
            contractFound.NumberVisit = com.number_visit;

            if (await _context.SaveChangesAsync() > 0)
            {
                return new JsonResult(new
                {
                    success = true,
                    message = "Se ha actualizado satisfactoriamente"
                });
            }
            else
            {
                return new JsonResult(new
                {
                    success = false,
                    message = "No se ha podido actualizar"
                });
            }
        }
    }
}
