// class PriorityQueue {
//     constructor() {
//         this.queue = [];
//     }

//     enqueue(element, priority) {
//         this.queue.push([element, priority ]);
//         this.sortQueue();
//     }

//     dequeue() {
//         if (this.isEmpty()) return "Queue is empty";
//         return this.queue.shift();
//     }

//     sortQueue() {
//         this.queue.sort((a, b) => a[1] - b[1]);
//     }

//     isEmpty() {
//         return this.queue.length === 0;
//     }
// }


class PriorityQueue {
    constructor() {
        this.heap = [];
    }

    enqueue(element, priority) {
        this.heap.push([element, priority]);
        this.bubbleUp(this.heap.length - 1);
        
    }
    
    bubbleUp(index) {
        let currentIndex = index;
        const heap = this.heap;
        while (currentIndex > 0) {
            const parentIndex = Math.floor((currentIndex - 1) / 2);
            if (heap[currentIndex][1] >= heap[parentIndex][1]) break;
            [heap[currentIndex], heap[parentIndex]] = [heap[parentIndex], heap[currentIndex]];
            currentIndex = parentIndex;
        }
    }
    dequeue() {
        if (this.heap.length == 0) { 
            console.log("heap is empty");
            return null;
        }
        var min = this.heap[0];
        this.heap[0] = this.heap.pop();//put last to first
        this.bubbleDown(0);
        return min;
    }
    
    //Time O(logn), Space O(1)
    bubbleDown(pos) {
        var currentItem = this.heap[pos];
        var currentIndex = pos;
        while (pos < Math.floor(this.heap.length/2)) {
            let left = 2*pos + 1;
            let right = 2*pos + 2;
            
            if(left < this.heap.length && this.heap[left][1] < this.heap[currentIndex][1]) currentIndex = left;
            if (right < this.heap.length && this.heap[right][1] < this.heap[currentIndex][1]) currentIndex = right;

            if (currentItem[1] <= this.heap[currentIndex][1])
                break;
            this.heap[pos] = this.heap[currentIndex];
            pos = currentIndex;				
        }
        this.heap[pos] = currentItem;   
    }
    isEmpty() {
        return this.heap.length === 0;
    }
}





class Graph{
    constructor(){
        this.vertices = [];
        // Pair of weight and vertice that start the way with that weight
        this.pair = []
        this.connections = {}
    }

    addVertices(vertex){
        if (!this.vertices.includes(vertex)) {
            this.vertices.push(vertex);
        }
    } 

    addEdge(vertex1, vertex2, weight){
        if (this.connections[vertex1] === undefined) {
            this.connections[vertex1] = [];
        }
        if (this.connections[vertex2] === undefined) {
            this.connections[vertex2] = [];
        }
        this.connections[vertex1].push([vertex2, weight])
        this.connections[vertex2].push([vertex1, weight])
    }

    addPair(parentVertice, weight, startVertice){
        if (!this.pair[parentVertice]) {
            this.pair[parentVertice] = [];
        }
        this.pair[parentVertice] = [weight, startVertice];
    }

    getConnectionsByKey(key){
        for(key in this.connections) {
            if(this.connections.hasOwnProperty(key)) {
                let value = this.connections[key];
                return value
            }
        }
    }

}
const graph = new Graph();


function checkVertices(){
    var graphBlock = document.getElementById("graph")
    var vertices = graphBlock.getElementsByClassName("vertice");

    return vertices.length > 0
}

let vertexIndex = 0;
var xPos
var yPos
function addVertice() {
    var graphBlock = document.getElementById("graph");
    if(!checkVertices()){
        vertexIndex = 0
    }
    var vertice = document.createElement("div");
    vertice.setAttribute("data-vertex-id", vertexIndex);
    vertice.textContent = vertexIndex;
    vertice.classList.add("vertice");
    vertice.id = vertexIndex


    xPos = Math.floor(Math.random() * (graphBlock.offsetWidth - 30)); // 30 - ширина вершины
    yPos = Math.floor(Math.random() * (graphBlock.offsetHeight - 30)); // 30 - высота вершины
    vertice.style.left = xPos + "px";
    vertice.style.top = yPos + "px";




    graph.addVertices(vertexIndex)
    graph.addPair(vertexIndex, Infinity, 0);
    console.log(graph.pair);
    var pair = document.createElement("div");
    pair.classList.add("pair");
    pair.id = vertexIndex
    var pairArray = graph.pair[vertexIndex];
    pair.textContent = `(${pairArray[0]}, ${pairArray[1]})`
    vertice.appendChild(pair)
    console.log(graph.vertices);


    graphBlock.appendChild(vertice);

    console.log(getVertexCenterCoordinates(vertice));

    vertexIndex++
}

function getValueFromInput(idName){
    return document.getElementById(idName).value
}

function getOffset(el) {
    const rect = el.getBoundingClientRect();
    return {
      left: rect.left + window.scrollX,
      top: rect.top + window.scrollY
    };
  }

  function getVertexCenterCoordinates(vertex) {
    var rect = vertex.getBoundingClientRect(); // Получаем размеры и координаты вершины относительно viewport
    var centerX = rect.left + rect.width / 2; // Находим горизонтальную координату центра
    var centerY = rect.top + rect.height / 2; // Находим вертикальную координату центра
    // var center = Math.floor(Math.sqrt((Math.pow(centerX, 2) + Math.pow(centerY, 2))))
    return { x: centerX, y: centerY };
}

let Weight
function createEdge(){
    let firstIndex = getValueFromInput("first_index");
    let secondIndex = getValueFromInput("second_index");

    console.log(firstIndex, secondIndex);

    if(!firstIndex || !secondIndex){
        alert("Enter all vertices!");
    }

    if(firstIndex == secondIndex){
        alert("You can't create an edge with the same vertex")
    }

    var vertex1 = document.querySelector('[data-vertex-id="' + firstIndex + '"]');
    var vertex2 = document.querySelector('[data-vertex-id="' + secondIndex + '"]');

    if(vertex1 == null || vertex2 == null){
        alert("One or both vertices doesnt exist")
    }

    let centerVertex1 = getVertexCenterCoordinates(vertex1)

    let centerVertex2 = getVertexCenterCoordinates(vertex2);

    Weight = Math.abs(Math.floor(Math.sqrt((Math.pow(centerVertex2.x - centerVertex1.x, 2) + Math.pow(centerVertex2.y - centerVertex1.y, 2)))))

    if(graph.connections[firstIndex]){
        for(let i = 0; i < graph.connections[firstIndex].length; i++){
            if(graph.connections[firstIndex][i][0] == secondIndex){
                alert("Such edge already exists!")
                return
            }
        }
    }
    graph.addEdge(firstIndex, secondIndex, Weight)

    addEdge(firstIndex, secondIndex, centerVertex1, centerVertex2, Weight)
    console.log(graph.connections);

    console.log(Weight);


}

let edgeId = 1

function addEdge(firstIndex, secondIndex, centerVertex1, centerVertex2, Weight){
    var graphBlock = document.getElementById("graph");
    var edge = document.createElement("div");
    edge.classList.add("edge");
    edge.id = `Edge№${edgeId}`
    edge.textContent = Weight;

    var graphRect = graphBlock.getBoundingClientRect(); // Получаем размеры и позицию родительского элемента
    console.log("GraphRect: ", graphRect);

    // var length = Math.floor(Math.sqrt(Math.pow(vertex1.x - vertex1.x, 2) + Math.pow(vertex2.y - vertex2.y, 2)));
    var angle = Math.atan2(centerVertex2.y - centerVertex1.y, centerVertex2.x - centerVertex1.x) * 180 / Math.PI;

    console.log(`center X for v${firstIndex}: ${centerVertex1.x}`);
    console.log(`center Y for v${firstIndex}: ${centerVertex1.y}`);

    edge.setAttribute("Weight", Weight);
    edge.setAttribute("Angle", angle);

    // edge.style.width = Weight + "px";
    // edge.style.left = verticeLeft; // Относительно левого края родительского элемента
    // edge.style.top = verticeTop; // Относительно верхнего края родительского элемента
    // edge.style.transform = "rotate(" + angle + "deg)";
    // console.log("edge top: ", edge.style.top);


    edge.style.width = Weight + "px";
    edge.style.left = centerVertex1.x - graphRect.left + "px"; // Относительно левого края родительского элемента
    edge.style.top = centerVertex1.y - graphRect.top + "px"; // Относительно верхнего края родительского элемента
    edge.style.transform = "rotate(" + angle + "deg)";
    console.log("edge top: ", edge.style.top);


    edge.setAttribute('vertice-start', firstIndex)
    edge.setAttribute('vertice-target', secondIndex);
    
    graphBlock.appendChild(edge);
    edgeId++
    
}


function getVerticeId(){
    var graphBlock = document.getElementById("graph");

    graphBlock.addEventListener('click', function(event) {
        // Получаем целевой элемент, на который было произведено нажатие
        var targetElement = event.target;
    
        // Получаем ID целевого элемента
        var id = targetElement.id;

        console.log(id);
    
        return id;
    });
}


function deleteVertices(){
    var graphBlock = document.getElementById("graph");
    var vertices = document.getElementsByClassName("vertice")
    var edges = document.getElementsByClassName("edge")

    for(let i = 0; i < vertices.length; i++){
        graph.vertices.pop(i)
        delete graph.pair[i]
    }

    while(vertices.length > 0){
        graphBlock.removeChild(vertices[--vertices.length]);
    }

    while(edges.length > 0){
        graphBlock.removeChild(edges[--edges.length])
    }
}
document.addEventListener('DOMContentLoaded', function() {
    const graph = document.getElementById('graph');

    graph.addEventListener('mousedown', function(event) {
        const target = event.target.closest('.vertice');
        if (!target) return;

        const draggedNode = target;
        draggedNode.classList.add('dragging');
        const shiftX = event.clientX - draggedNode.getBoundingClientRect().left;
        const shiftY = event.clientY - draggedNode.getBoundingClientRect().top;

        function moveAt(pageX, pageY) {
            const newX = pageX - shiftX - graph.getBoundingClientRect().left;
            const newY = pageY - shiftY - graph.getBoundingClientRect().top;
            draggedNode.style.left = newX + 'px';
            draggedNode.style.top = newY + 'px';
        }

        function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);
            updateEdgePositions(); // Update edge positions on vertex move
        }

        document.addEventListener('mousemove', onMouseMove);

        draggedNode.onmouseup = function() {
            document.removeEventListener('mousemove', onMouseMove);
            draggedNode.onmouseup = null;
            draggedNode.classList.remove('dragging');
        };
    });

    // Function to update edge positions
    function updateEdgePositions() {
        const edges = document.querySelectorAll('.edge');
        edges.forEach(edge => {
            const startVertexId = edge.getAttribute('vertice-start');
            const endVertexId = edge.getAttribute('vertice-target');
            const startVertex = document.getElementById(startVertexId);
            const endVertex = document.getElementById(endVertexId);
            updateEdgePosition(edge, startVertex, endVertex);
            
        });
    }

    // Function to update edge position
    function updateEdgePosition(edge, startVertex, endVertex) {
        const startX = startVertex.offsetLeft + startVertex.offsetWidth / 2;
        const startY = startVertex.offsetTop + startVertex.offsetHeight / 2;
        const endX = endVertex.offsetLeft + endVertex.offsetWidth / 2;
        const endY = endVertex.offsetTop + endVertex.offsetHeight / 2;

        const deltaX = endX - startX;
        const deltaY = endY - startY;

        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const angle = Math.atan2(deltaY, deltaX) * 180 / Math.PI;

        edge.textContent = Math.floor(distance)
        edge.style.left = startX + 'px';
        edge.style.top = startY + 'px';
        edge.style.width = distance + 'px';
        edge.style.transform = 'rotate(' + angle + 'deg)';
    }
});

function getWeightByVertices(firstIndex, secondIndex){
    let index1 = firstIndex
    let index2 = secondIndex
    var vertex1 = document.querySelector('[data-vertex-id="' + index1 + '"]');
    var vertex2 = document.querySelector('[data-vertex-id="' + index2 + '"]');

    let centerVertex1 = getVertexCenterCoordinates(vertex1)
    let centerVertex2 = getVertexCenterCoordinates(vertex2);


    return Math.abs(Math.floor(Math.sqrt((Math.pow(centerVertex2.x - centerVertex1.x, 2) + Math.pow(centerVertex2.y - centerVertex1.y, 2)))))

}




function dejkstra() {
    const pq = new PriorityQueue();
    if(graph.connections == 0){
        alert("No existing edges")
        return
    }
    var shortestVertices = document.getElementsByClassName("shortest_vertex")
    Array.from(shortestVertices).forEach(vertex => {
        vertex.classList.remove("shortest_vertex");
        var pair = vertex.querySelector('.pair');
        if (pair) {
            pair.classList.remove("pair_shortest");
        }
    });

    var allVertices = document.getElementsByClassName("vertice")
        
    for(let i = 0; i < allVertices.length; i++){
        var pair = allVertices[i].querySelector('.pair')
        pair.textContent = `(${Infinity}, ${0})`
    }



    console.log("activated dejkstra");
    let start = getValueFromInput("first_dejkstra_index");
    let end = getValueFromInput("second_dejkstra_index");
    const visited = []
    var shortestWay = []

    for(let i = 0; i < graph.vertices.length; i++){
        visited[i] = false
        graph.pair[i][0] = Infinity
        graph.pair[i][1] = 0
    }
    graph.pair[start][0] = 0

    var vertice = document.getElementById(start)
    var pair = vertice.querySelector('.pair')
    pair.textContent = `(${0}, ${0})`

    pq.enqueue(start, 0);
    let minWeightVertex = 0

    let k = 0

    while (!pq.isEmpty()) {
        k++
        if(k>100){
            return
        }
        let minWeight = Infinity
        let [currentVertex, currentWeight] = pq.dequeue();
        console.log("current vertex: ", currentVertex);

        if (currentVertex === end) {
            k++
            if(k> 150){
                return
            }
            console.log("creating shortest way");
            while(currentVertex !== start){
                console.log("current vertex: ", currentVertex);
                shortestWay.push(currentVertex);
                console.log(`vertex in pair for ${currentVertex}: `, graph.pair[currentVertex][1]);
                currentVertex = graph.pair[currentVertex][1]
            }
            shortestWay.push(currentVertex);
            shortestWay.reverse()
            break
        }

        if (currentWeight > graph.pair[currentVertex][0]) continue;

        if (!graph.connections[currentVertex]) continue; 

        graph.connections[currentVertex].forEach(neighbor => {
            // console.log("neighbor index: ", neighbor[0]);
            const [neighborVertex, neighborWeight] = neighbor;

            const newWeight = currentWeight + getWeightByVertices(neighborVertex, currentVertex);
            // console.log("new weight: ", newWeight);
            if (newWeight < graph.pair[neighborVertex][0]) {
                graph.pair[neighborVertex][0] = newWeight;
                graph.pair[neighborVertex][1] = currentVertex
                console.log(`vertex in graph pair for neighbor vertex ${neighborVertex} : v`, graph.pair[neighborVertex][1]);
                var vertice = document.getElementById(neighborVertex)
                var pair = vertice.querySelector('.pair')
                pair.textContent = `(${graph.pair[neighborVertex][0]}, v${graph.pair[neighborVertex][1]})`
                pq.enqueue(neighborVertex, newWeight);
                if(newWeight < minWeight){
                    minWeight = newWeight
                    minWeightVertex = neighborVertex
                }
            }
        });
    }

    console.log("colorising vertices");
    
    for(let i = 0; i < shortestWay.length; i++){
        var vertice = document.getElementById(shortestWay[i])
        vertice.classList.add("shortest_vertex")

        var pair = vertice.querySelector('.pair')
        pair.classList.add("pair_shortest")

    }
    console.log(shortestWay);
}
