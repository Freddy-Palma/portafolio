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
    public class ConsultationsController : ControllerBase
    {
        private readonly ModelContext _context;

        public ConsultationsController(ModelContext context)
        {
            _context = context;
        }

        // GET: api/Consultations
        [Route("registerConsultation")]
        [HttpPost]
        public JsonResult RegisterConsultation([FromBody]JObject data)
        {
            try
            {
                string name = data["name"].ToObject<string>();
                DateTime date_asesory = data["date_asesory"].ToObject<DateTime>();
                string resumen = data["resumen"].ToObject<string>();
                int id_profesional = data["id_profesional"].ToObject<int>();
                int rut_company = data["rut_company"].ToObject<int>();

                var cons = new
                {
                    name,
                    date_asesory,
                    resumen,
                    id_profesional,
                    rut_company
                };
                //await _context.SaveChangesAsync();
                
                OracleParameter param_name = new OracleParameter("v_name", OracleDbType.NVarchar2, cons.name, ParameterDirection.Input);
                OracleParameter param_date_asesory = new OracleParameter("v_date_asesory", OracleDbType.Date, cons.date_asesory, ParameterDirection.Input);
                OracleParameter param_resumen = new OracleParameter("v_resumen", OracleDbType.NVarchar2, cons.resumen, ParameterDirection.Input);
                OracleParameter param_id_profesional = new OracleParameter("v_id_profesional", OracleDbType.Int32, cons.id_profesional, ParameterDirection.Input);
                OracleParameter param_rut_company = new OracleParameter("v_rut_company", OracleDbType.Int32, cons.rut_company, ParameterDirection.Input);

                object[] parameters = new object[] {
                param_name,
                param_date_asesory,
                param_resumen,
                param_id_profesional,
                param_rut_company
                };
                
                string query = "begin pkg_create_consultation.sp_create_consultation(:v_name,:v_date_asesory,:v_resumen,:v_id_profesional,:v_rut_company); end; ";

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

        [HttpGet("getAllConsultations")]
        public async Task<JsonResult> GetAllConsultations()
        {
            return new JsonResult(await _context.Consultation.ToListAsync());
            //return new JsonResult(from us in _context.User select us);
        }

        [HttpGet("getConsultationByRut/{rut}")]
        public async Task<JsonResult> GetConsultation(decimal rut)
        {
            return new JsonResult(from com in _context.Consultation
                                  where com.RutCompany == rut
                                  select com);
        }
    }
}
