/*
        A note on all the binding. This is done to make sure the function being passed
        to an object of another class still knows that 'this' refers to the original class.

        ProjectListA: addProject ---> ProjectListB: switchHandler, this=> ProjectListA
        ProjectList: switchProject ---> ProjectItem: updateProjectListsHandler, this => ProjectList

        In the first case the function transfer is done by using setter.
        In the second case the function transfer is done using a constructor. 

        The point of giving functions in one class to another class is to enable
        comms between the classes. This is done via components in React but in there
        no binding is necessary!

        Remember there you can just you setState on child elements. There is no need to bind
        to ensure the function can access parent class/component items. 
*/

class DOMHelper {
  static moveElement(elementId, newDestinationSelector) {
    /*
      Doing it this way simply moves the HTML element. It does not make a copy!
    */
    const element = document.getElementById(elementId);
    const destinationElement = document.querySelector(newDestinationSelector);
    destinationElement.append(element);
  }

  static clearEventListeners(element) {
    const clonedElement = element.cloneNode(true);
    element.replaceWith(clonedElement);
    return clonedElement;
  }
}

class Component {}

class Tooltip {
  constructor(closeNotifierFunction) {
    this.closeNotifierHandler = closeNotifierFunction;
  }
  closeTooltip = () => {
    this.detach();
    this.closeNotifierHandler();
  };
  /*
  Note the advantage of using an arrow function: 

  If an arrow function is used, 'this' will always refer to the local context. 
  So there is no need to bind!!
  */
  detach = () => {
    this.element.remove();
  };

  attach(extraInfo) {
    const tooltipElement = document.createElement("div");
    tooltipElement.className = "card";
    tooltipElement.textContent = extraInfo;
    tooltipElement.addEventListener("click", this.closeTooltip);
    this.element = tooltipElement;
    document.body.append(tooltipElement);
  }
}

class ProjectItem {
  constructor(id, updateProjectListsFunction, type) {
    this.id = id;
    this.updateProjectListsHandler = updateProjectListsFunction;
    this.connectMoreInfoButton();
    this.connectSwitchButton(type);
  }

  hasActiveTooltip = false;

  showMoreInfoHandler() {
    if (this.hasActiveTooltip) {
      return;
    }
    /*
    we want to give the tool tip the ability to tell the project Item whether
    it is open or not. The closeNotifier now toggles the Project Item's state variable.

    Now each tooltip can only be open once
    */
    const tooltip = new Tooltip(() => {
      this.hasActiveTooltip = false;
    });
    tooltip.attach(this.extraInfo);
    this.hasActiveTooltip = true;
  }

  connectMoreInfoButton() {
    const projectItemElement = document.getElementById(this.id);
    const moreInfoItemBtn = projectItemElement.querySelector(
      "button:first-of-type"
    );
    this.extraInfo = projectItemElement.dataset.extraInfo;
    moreInfoItemBtn.addEventListener(
      "click",
      this.showMoreInfoHandler.bind(this)
    );
  }

  /*
  Here we want the click of the button to update both of the lists. We do this by
  giving it an event handler that allows the button to do this when it is clicked. 
  */
  connectSwitchButton(type) {
    const projectItemElement = document.getElementById(this.id);
    let switchBtn = projectItemElement.querySelector("button:last-of-type");
    switchBtn = DOMHelper.clearEventListeners(switchBtn);

    switchBtn.textContent = type === "active" ? "Finish" : "Activate";
    /*
    Note that there is a problem here. switchProject needs to take in a project ID.
    Therefore we bind the updateProjects Handler and pass in parameters that way. 

    For some reason, the switchProjectFunction that was passed over still stays bound
    to the ProjectLists object. 
    */
    switchBtn.addEventListener(
      "click",
      this.updateProjectListsHandler.bind(null, this.id)
    );
  }

  update(updateProjectsListsFn, type) {
    this.updateProjectListsHandler = updateProjectsListsFn;
    this.connectSwitchButton(type);
  }
}

class ProjectList {
  projects = [];
  constructor(type) {
    this.type = type;
    const projectItems = document.querySelectorAll(`#${type}-projects li`);
    /*
    We give each ProjectItem the ability to switch from one project list to
    another. Along with the HTML id so it can access the element by reference. 
    */
    for (const projectItem of projectItems) {
      // note that passing the reference to the project (id) is more efficient
      this.projects.push(
        new ProjectItem(
          projectItem.id,
          this.switchProject.bind(this),
          this.type
        )
      );
    }
  }

  // the switchProject firsts gives the project to switchHandler and then removes it
  // from the project list
  switchProject(projectId) {
    //give specified project in projects [] and give it to switchHandler function
    this.switchHandler(this.projects.find((p) => p.id === projectId));

    //remove project from project list
    const projectIndex = this.projects.findIndex((p) => p.id === projectId);
    this.projects.splice(projectIndex, 1);
  }

  /*
  Why not set the switch handler in the constructor? Because we need both instances to be
  finished in order to reach out to them. This is because the switch handler needs to 
  communicate between both projects lists (add from one and remove from the other)
  */

  // switchHandler function adds this project to the other list
  setSwitchHandlerFunction(switchHandlerFunction) {
    this.switchHandler = switchHandlerFunction;
  }

  addProject(project) {
    this.projects.push(project);
    DOMHelper.moveElement(project.id, `#${this.type}-projects ul`);
    /*
    We switched the project from ProjectListA to ProjectListB! Therefore the ProjectItem
    instance needs to have its updateLists/switchHandler/addProject function updated such 
    that it now refers to the other project. 
    */
    project.update(this.switchProject.bind(this), this.type);
  }
}

class App {
  static init() {
    const activeProjectsList = new ProjectList("active");
    const finishedProjectsList = new ProjectList("finished");
    /*
    This sets the switchHandlerFunction of activeProjects to the addProject function
    which is inside of finishedProjects. This makes sense because when the switchProject
    function is activated in activeProjects, we want it to eventually activate addProject
    in the finishedProjects on the same project!

    Semantically, we want this project to be added to finished projects when it is removed
    frrom activeProjects. 

    We bound the handler to finishedProjects because we need 'this' in the handler
    to refer to the finishedProjects object. 


    */
    activeProjectsList.setSwitchHandlerFunction(
      finishedProjectsList.addProject.bind(finishedProjectsList)
    );

    finishedProjectsList.setSwitchHandlerFunction(
      activeProjectsList.addProject.bind(activeProjectsList)
    );
  }
}

App.init();
