import { stat } from "fs";
import { loadavg, type } from "os";
import React from "react";

export default function CreatePromise() {
  //   let maxSubArray = function(nums:number[]) {
  //     const maxSumPerI = [];
  //     for(let i = 0; i< nums.length; i++ ){
  //         maxSumPerI[i] = { leftIndex: i, rightIndex: i, sum: nums[i] };
  //         for( let j= i + 1; j< nums.length; j ++ ){
  //             const currentSum:any = maxSumPerI[i].sum;
  //             if(currentSum < currentSum + nums[j]) {
  //                 maxSumPerI[i] = { leftIndex: j, rightIndex: j, sum: currentSum + nums[j] };
  //             }
  //         }
  //     }
  //     let maxSumObject = maxSumPerI[0];
  //     for(const i of maxSumPerI) {
  //         if(maxSumObject.sum < maxSumPerI[i].sum) {
  //             maxSumObject = maxSumPerI[i];
  //         }
  //     }
  //     console.log(`The subarray ${nums.slice(maxSumObject.leftIndex, maxSumObject.rightIndex)} has the largest sum ${maxSumObject.sum}.`);
  // };

  // function maxSubArray(nums: number[]) {
  //   let output: number = 0;
  //   let newArray: number[] = [];

  //   for (let i = 0; i < nums.length; i++) {
  //     newArray.push(nums[i]);
  //     output = newArray.reduce((a, b) => a + b, 0);

  //     if (output < nums[i]) {
  //       newArray = [nums[i]];
  //       output = nums[i];
  //     }
  //     console.log(newArray);
  //     console.log(output);
  //   }
  // }
  //   let nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
  //   let nums2 = [1];
  //   let nums3 = [5, 4, -1, 7, 8];

  //   maxSubArray(nums);

  type PromiseWithStatus = Promise<any> & { status: PromiseStatus };
  enum PromiseStatus {
    PENDING = "pending",
    FULFILLED = "fulfilled",
    REJECTED = "rejected",
  }

  async function makeQuarablePromise(
    promise: Promise<any>
  ): Promise<PromiseStatus> {
    let isPending = true;
    let isFullfild = false;
    let isRejected = false;

    const outerPromise = new Promise((res, rej) => {
      promise.then((value) => {
        isPending = false;
        isFullfild = true;
        console.log("here");
        res("cheked!");
      });
      promise.catch(() => {
        isPending = false;
        isRejected = true;
        res("cheked!");
      });
    });

    await outerPromise;
    console.log(isFullfild);
    console.log(isRejected);
    console.log(isPending);

    if (isFullfild) {
      return PromiseStatus.FULFILLED;
    }
    if (isRejected) {
      return PromiseStatus.REJECTED;
    } else {
      return PromiseStatus.PENDING;
    }
  }

  const promise = new Promise((res, rej) => {
    setTimeout(() => {
      console.log("timer is fineshed!");
      res("");
    }, 5000);
  });

 // makeQuarablePromise(promise);

  //example static function

  const promise1 = new Promise((resolve, reject) => {
    resolve(1);
  });
  const promise2 = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(2);
    }, 1000);
  });
  const promise3 = new Promise((resolve, reject) => {
    resolve(3);
  });

//Promise.all()
  Promise.all([promise1, promise2, promise3]).then((values) => {
    console.log(values);
  });
//Promise.any()
  // Promise.any([promise, promise2, promise3]).then((value)=>console.log(value))

//Promise.race()
  Promise.race([promise, promise2, promise3]).then((value)=>console.log(value))

  return <></>;
}
