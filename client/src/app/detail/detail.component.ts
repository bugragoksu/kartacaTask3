import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  id;
  title;
  desc;
  date;
  user;
  constructor(private route: ActivatedRoute, private api: ApiService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')
    this.getPostDetail()
  }

  getPostDetail() {
    this.api.getPostDetail(this.id).subscribe(
      data => {
        this.title = data.title
        this.desc = data.desc
        this.date = data.date
        this.user = data.user
      },
      error => {
        console.log(error);
      }
    )
  }

}
