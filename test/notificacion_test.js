var expect = require('chai').expect;

var Email = require('../src/notificaciones/Email').Email;
var Facebook = require('../src/notificaciones/Facebook').Facebook;
var Whatsapp = require('../src/notificaciones/Whatsapp').Whatsapp;
var Empleado = require('../src/empleado/Empleado').Empleado;
var ClasificadorFechaDePagoPorHora = require("../src/calculadoraFechaDePago/ClasificadorFechaDePagoPorHora").ClasificadorFechaDePagoPorHora;

var CalculadoraPorHora = require("../src/calculadoraSalario/CalculadoraPorHora").CalculadoraPorHora;
var AsistenciaPorDia = require("../src/tarjetas/AsistenciaPorDia").AsistenciaPorDia;
var TarjetaAsistencia = require("../src/tarjetas/TarjetaAsistencia").TarjetaAsistencia;
var MetodoDePago = require('../src/metodoDePago/MetodoDePago').MetodoDePago;
describe('notificaciones', function () {

    it('deberia devolver vacio cuando un empleado no agrego ningun medio de notificacion',  function () {
        let empleado = new Empleado();
        expect(empleado.notificar()).equal("");
    });

    it('deberia de notificar por facebook a un empleado que  agrego facebook como medio de notificacion',  function () {
        let asistencia1 = new AsistenciaPorDia("2019-05-03", "16:00:00", "20:00:00");
        let tarjetaAsistencia = new TarjetaAsistencia();
        tarjetaAsistencia.agregarAsistencia(asistencia1);
        let calculadora = new CalculadoraPorHora(200, tarjetaAsistencia);
        let fechaIncioLaboral = new Date(2019, 5, 3);
        let calculadoraDeFecha = new ClasificadorFechaDePagoPorHora(fechaIncioLaboral);
        let metodoDePago = new MetodoDePago("Deposito");
        let empleado = new Empleado("Erick", 1, calculadora, calculadoraDeFecha,metodoDePago);
        empleado = new Facebook(empleado);
        expect(empleado.notificar()).equal(" Facebook ");
    });

    it('deberia de notificar por facebook whatsapp y email a un empleado que  agrego estos 3 medios como medios de notificacion',  function () {
        let asistencia1 = new AsistenciaPorDia("2019-05-03", "16:00:00", "20:00:00");
        let tarjetaAsistencia = new TarjetaAsistencia();
        tarjetaAsistencia.agregarAsistencia(asistencia1);
        let calculadora = new CalculadoraPorHora(200, tarjetaAsistencia);
        let fechaIncioLaboral = new Date(2019, 5, 3);
        let calculadoraDeFecha = new ClasificadorFechaDePagoPorHora(fechaIncioLaboral);
        let metodoDePago = new MetodoDePago("Deposito");
        let empleado = new Empleado("Erick", 1, calculadora, calculadoraDeFecha,metodoDePago);
        empleado = new Facebook(empleado);
        empleado = new Whatsapp(empleado);
        empleado = new Email(empleado);

        expect(empleado.notificar()).equal(" Facebook  Whatsapp  Email ");
    });
});