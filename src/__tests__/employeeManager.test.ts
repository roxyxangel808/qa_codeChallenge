import { EmployeeHandler } from "./pageObjects/EmployeeHandler";

const em = new EmployeeHandler();

describe("Employee Manager", () => {
  beforeEach(async () => {
    await em.navigate();
  });
  afterAll(async () => {
    await em.quit();
  });
  it("can add a new employee", async () => {
    await em.addEmployee();
    await em.selectEmployeeByName("New Employee");
    await em.editEmployee({
      name: "test person",
      phone: "1234567890",
      title: "test result",
    });
    await em.saveChanges();
    await em.selectEmployeeByName("Dollie Berry");
    await em.selectEmployeeByName("test person");
    let employee = await em.getEmployeeInfo();
    expect(employee.name).toEqual("test person");
    expect(employee.phone).toEqual("1234567890");
    expect(employee.title).toEqual("test result");
  });
  it("can edit an existing employee", async () => {
    await em.selectEmployeeByName("Bernice Ortiz");
    await em.editEmployee({ title: "Grand Poobah" });
    await em.saveChanges();
    await em.selectEmployeeByName("Phillip Weaver");
    await em.selectEmployeeByName("Bernice Ortiz");
    let employee = await em.getEmployeeInfo();
    expect(employee).toEqual({
      id: 1,
      name: "Bernice Ortiz",
      phone: "4824931093",
      title: "Grand Poobah",
    });
  })
  //** Here is a test for adding a new emmployee */
    it("can add a new employee", async () => {
    await em.addEmployee();
    await em.selectEmployeeByName("New Employee");
    await em.editEmployee({
      name: "Shanti",
      phone: "1234567890",
      title: "Boss lady",
    })
  })
//** Here is a test for cancelling an edit of a new employee */
    it("cancelling an edit of an employee", async () => {
    await em.selectEmployeeByName("Eve Sparks")
    await em.editEmployee({ title: "Wizard Boss" });
    await em.cancelChanges()
    })
//** Here is a test for editing an employee and navigating away */
  it("edit employee and navigate away", async () => {
    await em.selectEmployeeByName("Dollie Berry")
    await em.editEmployee({ name: "Dollie Berry" });
    await em.selectEmployeeByName("Eve Sparks")
    await em.selectEmployeeByName("Dollie Berry")
  })
})
