import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
  title;
  desc;
  date;
  user;
  travelPosts = []
  userId;

  constructor(private modalService: NgbModal, private api: ApiService,private router:Router) {
    this.getPosts();
  }

  getItems(){
    return this.travelPosts;
  }

  getPosts = () => {
    this.api.getAllPosts().subscribe(
      data => {
        this.travelPosts = data;
      },
      error => {
        console.log(error);
      }
    )
  }
  postClicked = (post) => {
    this.router.navigate(['/detail/'+post.id]);
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }
  addPostClicked = () => {
    this.userId = localStorage.getItem("userId")
    console.log(this.userId);
    if (this.title && this.desc) {
      this.api.addPost(this.title, this.desc, this.userId).subscribe(
        data => {
          this.travelPosts.push(data)
          this.modalService.dismissAll()
        },
        error => {
          console.log(error);
        }
      )
    } else {
      alert('Title and description required');
    }

  }
}
