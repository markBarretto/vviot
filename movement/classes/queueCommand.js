function QueueCommand(type, direction, steps){
   this.type = type;
   this.direction = direction;
   this.steps = steps;
}

module.exports = QueueCommand;