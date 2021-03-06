import { Component, OnInit } from '@angular/core';
import {DatabaseService} from '../shared/services/database.service';
import {MatTableDataSource} from '@angular/material';
import {Router} from '@angular/router';

export interface Topic {
  description: string;
  isActive: true;
  name: string;
  rate: string | number;
}

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss']
})
export class TopicsComponent implements OnInit {

  topics: Array<Topic>;

  topicsChecked;

  constructor(
    private dbService: DatabaseService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.dbService.getList('topics')
      .subscribe((topics: Array<Topic>) => {
        this.topics = topics;
        this.topicsChecked = this.topics.map(t => ({...t, checked: false}));
      });
  }

  onTopicClick(i: number): void {
    this.topicsChecked[i].checked = !this.topicsChecked[i].checked;
  }

  onCreateClick(topic: Topic): void {
    this.dbService.topic = topic;
    this.router.navigate(['/app/create-ad']);
  }

}
