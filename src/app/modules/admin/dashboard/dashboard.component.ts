import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
export interface Details {
  position: number;
  name: string;
  district: string;
  state: string;
  
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  data: any;
  options: any;
  data1:any;
  options1:any;
  // Chartist:any;
  // displayedColumns: string[] = ['position', 'name', 'district', 'state', 'view document'];
  // tieUpDataSource = new MatTableDataSource<Details>(ELEMENT_DATA);
  // retailersDataSource = new MatTableDataSource<Details>(ELEMENT_DATA1);
  // collectionCenterDataSource = new MatTableDataSource<Details>(ELEMENT_DATA2);
  // public datasets: any;
  
  // public salesChart:any;
  // public clicked: boolean = true;
  // public clicked1: boolean = false;
  // chartOrders!: ChartItem;
  // chartExample2: any;
  // chartSales!: ChartItem;
  // chartExample1: any;

   @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  constructor() { 
      // Graph
//      this.data = {
//       labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
//       datasets: [
//           {
//               label: 'Read Meat',
//               data: [65, 59, 80, 81, 56, 55, 40],
//               fill: false,
//               borderColor: 'red'
//           },
//           {
//               label: 'Chicken',
//               data: [28, 48, 40, 19, 86, 27, 90],
//               fill: false,
//               borderColor: '#84DE02'
//           },
//           {
//             label: 'Sea Food',
//             data: [22, 65, 20, 80, 30, 98, 32],
//             fill: false,
//             borderColor: 'blue'
//         },
       
//       ]
//   }
//   this.options = {
//     title: {
//         display: true,
//         text: 'Sales Of Catagory',
//         fontSize: 16
//     },
//     legend: {
//         position: 'top'
//     }
// };
}

     
  
    
  ngOnInit(): void{
  //  this.renderchat();

   const documentStyle = getComputedStyle(document.documentElement);
   const textColor = documentStyle.getPropertyValue('--text-color');

   this.data = {
       labels: ['Chicken', 'Read Meat', 'Fish','prawn',],
       datasets: [
           {
               data: [300, 50, 100,50],
               backgroundColor: ['#FCB2EC','#FFE977','#FAB6CA','#B3CEF5'],
               hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400')]
           }
       ]
   };


   this.options = {
       cutout: '60%',
       plugins: {
           legend: {
               labels: {
                   color: textColor
               }
           }
       }
   };

}













}










  


//   public updateOptions() {
//     this.salesChart.data.datasets[0].data = this.data;
//     this.salesChart.update();

//  }
// }

// ngAfterViewInit() 
// {
//   this.tieUpDataSource.paginator =  this.paginator.toArray()[0];
//   this.retailersDataSource.paginator = this.paginator.toArray()[1];
//   this.collectionCenterDataSource.paginator = this.paginator.toArray()[2];
// }



// renderchat(){
//   const ctx = document.getElementById('myChart');

//   new Chart("chart-orders", {
//     type: 'pie',
//     data: {
//       labels: ['Chicken', 'Redmeat', 'SeaFood','crab' ,'prawns','Totalsell'],
//       datasets: [{
//         label: '# of Votes',
//         data: [10, 19, 10, 30],
//         borderWidth: 1
        
//       }],
      
//     },
//     options: {
//       scales: {
//         y: {
//           beginAtZero: true
//         }
//       }
//     }
//   });
// }


